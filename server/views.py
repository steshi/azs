from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view

from server.models import AzsStation, SummaryForBenzine
from srv.settings import MBTILES
import sqlite3


@api_view(['GET'])
def inform(request, id):
    dop_inf = AzsStation.objects.get(id=id)
    keys = ("benzine__name", "cost", 'discont')
    benzines = SummaryForBenzine.objects.filter(azs__id=id).prefetch_related("benzine").values(*keys)
    return Response({
        "benzines": benzines, 
        "dop_inf": {"address": dop_inf.address, "services": dop_inf.services}
        })

@api_view(['GET'])
def stations(request):
    keys = ("id", "azstype__name", "number", "lat", "lon")
    azs = AzsStation.objects.prefetch_related('azstype').all().values(*keys)
    return Response({"data": azs})


def map_tile(request, z, x, y):
    print("!!!!!=", z,x,y)
    origin = request.GET.get('origin')
    mbtiles = MBTILES
    try:
        conn = sqlite3.connect(mbtiles)
        cur = conn.cursor()
        print ("step 1")
        if origin == 'top':
            # invert y axis to top origin
            ymax = 1 << int(z);
            y = ymax - int(y) - 1;
          
        query = "SELECT tile_data FROM tiles WHERE zoom_level={} and tile_column={} and tile_row={}".format(z,x,y)
        print (query)
        cur.execute(query)
        rows = cur.fetchall()
        print("rows=", rows)
        if len(rows):
            cur.close()
            conn.close()
            response = HttpResponse(rows[0][0], content_type="application/x-protobuf")
            response['Content-Encoding'] = 'gzip'
            return response
        else:
            response = {
                'success': False,
            }
            return JsonResponse(response, status=404)
    except Exception as e:
        print(e)
        return JsonResponse({'success': False, 'message': str(e)}, status=500)
    finally:
        if (conn):
            conn.close()
    return JsonResponse({'success': True})
