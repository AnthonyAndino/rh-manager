from django.db import models

class Empleado(models.Model):
    idEmpleado = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    departamento = models.CharField(max_length=100)
    sueldo = models.DecimalField(max_digits=10, decimal_places=2)
    
    class Meta:
        db_table = 'empleados'
        
    def __str__(self):
        return f'{self.idEmpleado} - {self.nombre} ({self.departamento})'
    
class Asistencia(models.Model):
    idAsistencia = models.AutoField(primary_key=True)
    empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE, db_column='idEmpleado', related_name='asistencias')
    fecha = models.TimeField()
    hora_entrada = models.TimeField()
    hora_salida = models.TimeField(null=True, blank=True)
    estado = models.CharField(max_length=50, default='A Tiempo')
    
    class Meta: db_table = 'asistencia'
    
class Nomina(models.Model):
    idNomina = models.AutoField(primary_key=True)
    empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE, db_column='idEmpleado', related_name='nominas')
    fecha_pago = models.DateField()
    sueldo_base = models.DecimalField(max_digits=10, decimal_places=2)
    deducciones = models.DecimalField(max_digits=10, decimal_places=2)
    bonos = models.DecimalField(max_digits=10, decimal_places=2)
    sueldo_neto = models.DecimalField(max_digits=10, decimal_places=2)
    
    class Meta:
        db_table = 'nominas'
    
