# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Truck.delete_all
Food.delete_all

require 'open-uri'

json = HTTParty.get("https://api.foursquare.com/v2/venues/search?client_id=RJSWD24SW0YBT3ARBT3UES4HFRZCE5XZR5HPN0MIC11KJXDX&client_secret=AARRX54N1DZKWZ5SPOJ3QPCDUJD2XN4TT0BJAIRUVI51DUSS&ll=40.7,-74&categoryId=4bf58dd8d48988d1cb941735")
hash = json.parsed_response	
response = hash['response']['groups'][0]['items']

response.each do |truck|
	name = truck['name']
	id = truck['id']
	lat = truck['location']['lat']
	lng = truck['location']['lng']
	Truck.create(name: name, latitude: lat, longitude: lng, foursq_id: id)
end

json2 = HTTParty.get("https://api.foursquare.com/v2/venues/explore?client_id=RJSWD24SW0YBT3ARBT3UES4HFRZCE5XZR5HPN0MIC11KJXDX&client_secret=AARRX54N1DZKWZ5SPOJ3QPCDUJD2XN4TT0BJAIRUVI51DUSS&ll=40.7,-74&query=Food%20Truck")
hash2 = json2.parsed_response	
response2 = hash2['response']['groups'][0]['items']

response2.each do |truck|
	
	unless Truck.find_by_foursq_id(truck['venue']['id'])
		id = truck['venue']['id']
		name = truck['venue']['name'] 
		lat = truck['venue']['location']['lat']
		lng = truck['venue']['location']['lng']
		Truck.create(name: name, latitude: lat, longitude: lng, foursq_id: id)
	end
end

types_of_food = ["mexican", "italian", "ice cream"]

types_of_food.each do |type_food|
	newType = Food.create(type_food: type_food)
end

trucks = Truck.all

trucks.each do |truck|
	food_array = Food.all
	i = rand(0..2)
	truck.foods << food_array[i]
end










