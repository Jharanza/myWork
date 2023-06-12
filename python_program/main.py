import users.actions as act

print('Asistente de Registro')

print(""" 
Options:
	1 Register
	2 Login 
""")
option = input('What do you want to do?: ').lower()

election = act.Action()
if option == 'register' or option == '1':
	election.register()

elif option == 'login' or option == '2':
	election.login()
	