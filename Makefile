testserver:
	flask -a core --debug run --port=5080

runserver:
	gunicorn -w 5 -b 0.0.0.0:5080 --log-level debug --log-file logs/gunicorn.log core:app &
