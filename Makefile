testserver:
	flask -a core --debug run --port=5080

runserver:
	gunicorn --workers 3 --bind unix:roadratio.sock --log-level debug --log-file logs/gunicorn.log core:app  &
