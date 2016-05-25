from flask import (Flask, g, request, session, redirect,
        url_for, render_template, flash)
from flask_script import Manager
import redis
import os
from roadratio.app import config as config_file
from normality import slugify

app = Flask(__name__,
        template_folder=os.getenv('ROAD_RATIO_TEMPLATES'),
        static_folder=os.getenv('ROAD_RATIO_STATIC'))
app.config.from_object(config_file)

def get_db():
    if not hasattr(g, 'redis'):
        g.redis = redis.StrictRedis(**app.config['REDIS'])
    return g.redis

### VIEWS

@app.route('/')
def counties():
    '''
    '''
    county_data = {}
    try:
        db = get_db()
    except Exception, err:
        print "ERROR: %s" % str(err)
        return render_template('error.html')
    return render_template('index.html', county_data=county_data)

### END OF VIEWS

manager = Manager(app)

if __name__ == "__main__":
    manager.run()
