import redis, csv
from normality import slugify
from roadratio.app import config

if __name__ == '__main__':
    records = csv.reader(open('county-roads.csv'), delimiter=',')
    budget_records = csv.reader(open('county-roads-budget.csv'), delimiter=',')
    r = redis.StrictRedis(**config.REDIS)
    count = 0
    for record in records:
        count += 1
        county = slugify(record[0])
        r.set(county,
                dict(
                    paved_roads=str(record[1]).strip()
                    ))
    r.save()
    print "Saved %s counties" % count
    end = count

    for item in budget_records:
        if item[0] == 'COUNTY':
            continue
        count += 1
        county = slugify(item[0])
        county_data = eval(r.get(county))
        county_data['infra_budget'] = dict(
                recurrent=str(item[2]),
                development=str(item[3])
                )
        r.set(county, county_data)
    r.save()
    print "Updated %s counties" % (count-end)
