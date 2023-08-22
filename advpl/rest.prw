#include "protheus.ch"
#include "restful.ch"

WSRESTFUL TSSPARAM DESCRIPTION "REST de parametros do TSS"

	WSMETHOD GET DESCRIPTION "Retorna os parametros da tabela SPED000"    PATH "/v1/tssparam/"

END WSRESTFUL

WSMETHOD GET WSSERVICE TSSPARAM

	::setContentType("application/json")
	::setResponse('{ "items": [ { "id": "0148093543698", "name": "Ronaldo Nascimento Filho", "birthdate": "1980-11-01T00:00:00-00:00", "genre": "male", "city": "3550308", "status": "active", "nickname": "ronaldo.filho", "email": "ronaldo.f@gmail.com", "nationality": "Brazilian", "birthPlace": "São Paulo", "graduation": "College", "father": "Papai", "mother": "Mamãe", "street": "Santos Dumont", "country": "Brasil", "genreDescription": "Masculino", "statusDescription": "Ativo", "cityName": "São Paulo", "state": "São Paulo", "uf": "SP", "dependents": [ { "id": 109481, "name": "Maria", "age": "10", "related": "Daughter", "birthdate": "2008-12-10" }, { "id": 109482, "name": "Joana", "age": "12", "related": "Daughter", "birthdate": "2008-12-10" }, { "id": 109483, "name": "Pedro", "age": "13", "related": "Son", "birthdate": "2008-12-10" }, { "id": 109484, "name": "Paulo", "age": "15", "related": "Son", "birthdate": "2008-12-10" }, { "id": 109485, "name": "José", "age": "19", "related": "Son", "birthdate": "2008-12-10" } ] }] ,"hasNext":false }')

return .T.
