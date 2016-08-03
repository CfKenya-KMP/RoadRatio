from flask import (Flask, g, request, session, redirect,
        url_for, render_template, flash)
from flask_script import Manager
import redis
import os
from roadratio.app import config as config_file
from normality import slugify
from roadratio.app import chart

app = Flask(__name__,
        template_folder=os.getenv('ROAD_RATIO_TEMPLATES'),
        static_folder=os.getenv('ROAD_RATIO_STATIC'))
app.config.from_object(config_file)

def get_db():
    if not hasattr(g, 'redis'):
        g.redis = redis.StrictRedis(**app.config['REDIS'])
    return g.redis


def sort_list_by_key(list_, key):
    '''
    @list_ :  a list of <dict> objects with a `key` key
    @key   :  a key in all <dict> objects in `list_`. Value of `key` must be an <int>
    '''
    try:
        return sorted(list_, key=lambda k: k[key])
    except Exception, err:
        print "ERROR: Failed to sort list -- %s" % str(err)
        return list_


def get_county_data(county):
    '''
    '''
    rds = get_db()
    resp = eval(rds.get(slugify(county)))
    county_payload = dict(
            county=county,
            county_str=county.capitalize(),
            paved_roads=resp.get('paved_roads', 0),
            paved_roads_int=float(resp.get('paved_roads', 0)),
            not_paved_roads=100 - float(resp.get('paved_roads', 0)),
            infra_budget_str=str(resp['infra_budget']['development']).replace('M', ' million'),
            infra_budget_int=int(str(resp['infra_budget']['development']).replace('M', '000000'))
            )
    return county_payload
    

### VIEWS

@app.route('/')
def counties():
    '''
    '''
    county_data = []
    for county in app.config['COUNTIES']:
        if not county in app.config['NODATA']:
            resp = get_county_data(county)
            county_data.append(resp)
    sorted_resp = sort_list_by_key(county_data, 'paved_roads_int')

    sorted_data = []
    rank = len(sorted_resp)
    for each in sorted_resp:
        each['rank'] = rank
        sorted_data.append(each)
        rank -= 1

    reverse_sorted = []
    for idx in range(0, len(sorted_data)):
        reverse_sorted.append(sorted_data.pop())
    
    section_one = reverse_sorted[0]
    section_two = reverse_sorted[1:10]
    section_three = reverse_sorted[10:len(reverse_sorted)-1]

    print section_one

    return render_template('index.html',
            section_one=section_one,
            section_two=section_two,
            section_three=section_three)


@app.route('/subpage.html')
def subpage():
    '''
    '''
    args = request.args.copy()
    _county = args['county']

    # all county data
    county_data = []
    for county in app.config['COUNTIES']:
        if not county in app.config['NODATA']:
            county_payload = get_county_data(county)
            county_data.append(county_payload)
    sorted_data = []
    rank = len(county_data)
    for each in sort_list_by_key(county_data, 'paved_roads_int'):
        each['rank'] = rank
        sorted_data.append(each)
        rank -= 1

        if each['county'] == _county: # hook to isolate the `_county`
            _county_data = each
    
    url = chart.bar_chart(county, dict(infra_budget=_county_data['infra_budget_int'], total_budget=98000000))
    return render_template('subpage.html', this_county=_county_data, county_payload=sorted_data, chart_url=url)

@app.route('/story')
def story():
    return render_template('story.html')

### END OF VIEWS

manager = Manager(app)

if __name__ == "__main__":
    manager.run()
