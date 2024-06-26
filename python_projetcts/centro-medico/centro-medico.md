---
layout: default
title: Clínica Peso Feliz

---

Se tiene una base de datos, clinica.db, de la cual se extraen los nombres de los médicos, y cada médico tiene una lista de pacientes. 

De los pacientes se obtiene sus apellidos, nombres, alturas, edades y sexos. 

Posterior a eso, se grafica, en una nueva ventana, la variación del peso muestreado de forma semanal. 

## Interfaz gráfica de los pacientes 
![](/python_projetcts/centro-medico/foto-interfaz.png)

## Interfaz gráfica de los pesos
![](/python_projetcts/centro-medico/fotos-pesos.png)

### Código para extraer los datos 

```python
import sqlite3

class Database:
    datafile = "clinica.db"
    def __init__(self):
        # Se habilita la conexion con la dB
        self.conn = sqlite3.connect(Database.datafile)
        self.cur = self.conn.cursor()
        
        
    def __del__(self):
        # Se cierra la conexion con la dB
        self.conn.close()
        
        
    def listar_medicos(self):
        # Retorna una lista de tuplas con la informacion de los medicos
        # con el formato [(med_id, nombre, apellido), ...]
        #
        # Se utiliza para llenar la informacion de la tabla tabMedicos
        sql = """SELECT medicos.med_id, medicos.nombre, medicos.apellido FROM medicos"""  
        return [(item[0],item[1],item[2]) for  item in self.cur.execute(sql)]
    
    
    def listar_pacientes_medico(self, med_id):
        # Retorna una lista de tuplas con la información de un paciente que se 
        # encuentra asignado a un medico (segun el med_id) con el formato
        # [(pac_id, apellido, nombre, altura, edad, sexo), ...], ordenado 
        # alfabeticamente por apellido
        #
        # Se utiliza para llenar la informacion de la tabla tabPacientes
        sql = """SELECT medicos.med_id, pacientes.pac_id, pacientes.apellido, pacientes.nombre, pacientes.altura, pacientes.edad, pacientes.sexo FROM medicos
                JOIN medico_paciente
                JOIN pacientes
                ON medicos.med_id = medico_paciente.med_id
                   AND  medico_paciente.pac_id = pacientes.pac_id
                   WHERE medicos.med_id = ?"""
        
        return [(item[0], item[1], item[2], item[3], item[4], item[5], item[6]) for  item in self.cur.execute(sql,(med_id,))]   
    
    def nombre_paciente(self, id_pac):
        # Retorna una string con el nombre del paciente con el formato "apellido, nombre"
        #
        # Se utiliza para el titulo del gráfico
        sql = """SELECT pacientes.pac_id, pacientes.nombre, pacientes.apellido FROM pacientes
                WHERE pacientes.pac_id = ?"""
        
        results = self.cur.execute(sql,(id_pac,))
        for item in results:
            a = "{}, {}".format(item[1],item[2])
        
        return a
    
    
    def data_peso(self, pac_id):
        # Retorna una lista con los pesos registrados de un paciente en el 
        # historial de pesos: [peso1, peso2, ...]
        #
        # Se utiliza para el reporte gráfico
        sql = """SELECT historial_pesos.pac_id, historial_pesos.peso, historial_pesos.peso_datetime FROM historial_pesos
                 WHERE historial_pesos.pac_id = ?
                 ORDER BY historial_pesos.peso_datetime
                """
        return [item[1] for  item in self.cur.execute(sql,(pac_id,))]

```

### Código de las interfaces gráficas

```python
import tkinter as tk
import tkinter.ttk as ttk
from db_clinica import Database
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg


class MainWindow:
    def __init__(self, master):
        # Definicion de la Ventana Principal
        self.master = master
        self.master.title("Clinica Peso Feliz")
        self.master.resizable(0, 0)
        
        self.db = Database()
        
        style = ttk.Style()
        style.theme_use('default')
        
        style.configure("Treeview",)
        
        frm = tk.Frame(self.master)
        frm.pack(padx=10, pady=10)
        
        frm1 = tk.LabelFrame(frm, text="Medicos")
        frm1.pack(side=tk.LEFT, padx=10, pady=10)
        frm2 = tk.LabelFrame(frm, text="Data Pacientes")
        frm2.pack(side=tk.LEFT, padx=10, pady=10)
        
        # -------------------------- frm1 ------------------------------
        # Tabla para el registro de los Medicos
        self.tabMedicos = ttk.Treeview(frm1, columns=(1, 2))
        self.tabMedicos.grid(row=0, column=0, padx=5, pady=5, sticky=tk.W)
        self.tabMedicos.heading('#0', text= "ID")
        self.tabMedicos.heading('#1', text= "Nombre")
        self.tabMedicos.heading('#2', text= "Apellido")
        
        self.tabMedicos.column('#0', width=60, minwidth=100, stretch=tk.NO)
        self.tabMedicos.column('#1', width=100, minwidth=100, stretch=tk.NO)
        self.tabMedicos.column('#2', width=100, minwidth=100, stretch=tk.NO)
       
                
        for item in self.db.listar_medicos():
            self.tabMedicos.insert("", tk.END, text = item[0], values = item[1:])
        
        self.tabMedicos.bind("<<TreeviewSelect>>", self.update_data_patients)
        
        # -------------------------- frm2 ------------------------------ 
        # Tabla con el registro de los Pacientes + Scrollbar Vertical
        self.scrY = tk.Scrollbar(frm2, orient='vertical')
        self.tabPacientes = ttk.Treeview(frm2, columns=(1, 2, 3, 4, 5), 
                                         yscrollcommand=self.scrY.set,
                                         selectmode='browse')
        self.scrY.configure(command=self.tabPacientes.yview)
        
        self.tabPacientes.pack(side=tk.LEFT, padx=5, pady=5)
        
        self.tabPacientes.heading('#0', text= "ID")
        self.tabPacientes.heading('#1', text= "Apellido")
        self.tabPacientes.heading('#2', text= "Nombre")
        self.tabPacientes.heading('#3', text= "Altura")
        self.tabPacientes.heading('#4', text= "Edad")
        self.tabPacientes.heading('#5', text= "Sexo")
        
        self.tabPacientes.column('#0', width=120, minwidth=30, stretch=tk.NO)
        self.tabPacientes.column('#1', width=120, minwidth=150, stretch=tk.NO)
        self.tabPacientes.column('#2', width=120, minwidth=80, stretch=tk.NO)
        self.tabPacientes.column('#3', width=120, minwidth=80, stretch=tk.NO)
        self.tabPacientes.column('#4', width=80, minwidth=80, stretch=tk.NO)
        self.tabPacientes.column('#5', width=80, minwidth=80, stretch=tk.NO)
       
        self.scrY.pack(side=tk.LEFT, expand=True, fill=tk.Y)
        
        self.tabPacientes.bind("<<TreeviewSelect>>", self.open_graph_window)
        
        # ------------------------ statusbar ---------------------------
        self.statusbar = tk.Label(self.master, text="", bd=1, relief=tk.SUNKEN, anchor=tk.W)
        self.statusbar.pack(side=tk.BOTTOM, fill=tk.X)
        
        self.tabMedicos.bind("<Enter>", lambda x: self.update_statusbar("Haga click para ver los pacientes asigandos al medico"))
        self.tabMedicos.bind("<Leave>", lambda x: self.update_statusbar(""))
        self.tabPacientes.bind("<Enter>", lambda x: self.update_statusbar("Haga click para ver el registro de peso del paciente"))
        self.tabPacientes.bind("<Leave>", lambda x: self.update_statusbar(""))


    def update_statusbar(self, message):
        # Actualiza los mensajes en el statusbar
        self.statusbar.config(text=message)
       
        
    def update_data_patients(self, event):
        # Carga con datos la tabla de pacientes al seleccionar un medico
        idx = self.tabMedicos.selection()
        pacient = self.tabMedicos.item(idx)['text']
        
        self.tabPacientes.delete(*self.tabPacientes.get_children())
        
        for idx,paciente in enumerate(self.db.listar_pacientes_medico(pacient)):
            self.tabPacientes.insert("", tk.END, text=paciente[1], values=paciente[2:])
            
    
    def open_graph_window(self, event):
        # Abre la ventana secundaria con el grafico de peso
        window = tk.Toplevel(self.master)
        idx = self.tabPacientes.selection()
        id_pac = self.tabPacientes.item(idx)['text']
        GraphWindow(window, id_pac)
    
    
class GraphWindow:
    def __init__(self, master, id_pac):
        # Definicion de la ventana grafica
        # (requiere id_pac para cargar los datos de un paciente)
        self.master = master
        self.master.title("Reporte Gráfico")
        self.master.geometry("400x300")
        
        self.db = Database()
        
        frm = tk.Frame(self.master)
        frm.pack()
        
        self.nombres = self.db.nombre_paciente(id_pac)
        self.pesos = self.db.data_peso(id_pac)
        self.pesos_minimos = round(min(self.pesos)-20)
        self.pesos_maximos = round(min(self.pesos)+30)
        
        # ------------------ Figura de Matplotlib -----------------------------
        self.fig, self.ax = plt.subplots(figsize=(6, 4), facecolor="#F0F0ED")
        self.ax.grid(linestyle=":")
        self.line = self.ax.plot(self.pesos, '-s')
        self.ax.set_ylim(self.pesos_minimos, self.pesos_maximos)
        self.ax.set_title(f"Paciente - {self.nombres[0:]}")
        self.ax.set_xlim(0, len(self.pesos)+2)
        self.ax.set_xticklabels([0,2,4,6,8,10,12,14,16,18])
        #self.ax.set_yticklabels([i for i in range(self.pesos_minimos,self.pesos_maximos)])    
        
        self.ax.set_xlabel("Semana")
        self.ax.set_ylabel("Peso [Kg]")
        self.graph = FigureCanvasTkAgg(self.fig, master=frm)
        self.graph.get_tk_widget().pack(expand=True, fill=tk.X)
        
root = tk.Tk()
app = MainWindow(root)
root.mainloop()

```

