class Action:

	def register(self):
		print('Ok! Lets do it')
		name = input('What is your name?: ')
		last_name = input('What is your last name?: ')
		email = input('write your email: ').lower()
		password = input('write your password: ')
		re_pswd = input('write again your password: ')
		while re_pswd != password:
			re_pswd = input('The passwords are diferent. Write it again: ')
		print('Fabulous!')

	def login(self):
		print('Input your information')
		email = input('write your email: ').lower()
		password = input('write your password: ')
		print('Logued')