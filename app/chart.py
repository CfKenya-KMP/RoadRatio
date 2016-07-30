import plotly.offline as off
import plotly.plotly as py
import plotly.graph_objs as go

fig = dict(
    data = [go.Bar(
                x=['development', 'recurrent', 'total'],
                y=[1000000, 500000, 5000000]
        )],
    layout = {'title': 'Infrastructure Budget'}
    )


#py.plot(data, filename='basic-bar')
off.plot(fig, output_type='div', filename='infra')
