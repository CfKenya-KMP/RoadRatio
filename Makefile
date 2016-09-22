testserver:
	python app/__init__.py runserver --port=5080

runserver:
	gunicorn --workers 3 --bind unix:roadratio.sock --log-level debug --log-file logs/gunicorn.log app:app  &
