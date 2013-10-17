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

 
# try limit50
# section "food" with queries
# intent
# and downloading foursquare id and retreiving info separately.

json = HTTParty.get("https://api.foursquare.com/v2/venues/search?client_id=RJSWD24SW0YBT3ARBT3UES4HFRZCE5XZR5HPN0MIC11KJXDX&client_secret=AARRX54N1DZKWZ5SPOJ3QPCDUJD2XN4TT0BJAIRUVI51DUSS&near=New%20York%20City&query=Food%20Truck&intent=browse")
hash = json.parsed_response	
response = hash['response']['groups'][0]['items']

response.each do |truck|
	twitter = truck['contact']['twitter']
	name = truck['name']
	lat = truck['location']['lat']
	lng = truck['location']['lng']
	Truck.create(name: name, latitude: lat, longitude: lng, twitter: twitter)
end

json = HTTParty.get("https://api.foursquare.com/v2/venues/search?client_id=RJSWD24SW0YBT3ARBT3UES4HFRZCE5XZR5HPN0MIC11KJXDX&client_secret=AARRX54N1DZKWZ5SPOJ3QPCDUJD2XN4TT0BJAIRUVI51DUSS&near=New%20York%20City&categoryId=4bf58dd8d48988d1cb941735&intent=browse")
hash = json.parsed_response	
response = hash['response']['groups'][0]['items']

response.each do |truck|
	unless Truck.find_by_name(truck['name'])
		twitter = truck['contact']['twitter']
		name = truck['name']
		lat = truck['location']['lat']
		lng = truck['location']['lng']
		Truck.create(name: name, latitude: lat, longitude: lng, twitter: twitter)
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










