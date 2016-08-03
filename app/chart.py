import plotly.offline as off
import plotly.plotly as py
import plotly.graph_objs as go


def bar_chart(filename, columns, **kwargs):
    '''
    return URL to a bar chart on plotly

    @filename:   name of the file (crazy, huh?)
    @columns:    `dict` with column names and values
    @kwargs:     anything else you wanna pass to plotly.plotly.plot
    '''
    print "%s --  %s" % (columns.keys(), columns.values())
    figure = dict(
            data = [go.Bar(
                x=columns.keys(), y=columns.values()
                )],
            layout = dict(
                title="Road Ratio %s" % filename
                )
            )
    return py.plot(figure, filename=filename, auto_open=False, fileopt='overwrite')



if __name__ == '__main__':
    county = "gotham"
    data = dict(bananas=5, oranges=7, monkeys=3)
    url = bar_chart(county, data)
    print url
