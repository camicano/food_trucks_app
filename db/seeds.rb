# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
url = "https://api.foursquare.com/v2/venues/search?client_id=RJSWD24SW0YBT3ARBT3UES4HFRZCE5XZR5HPN0MIC11KJXDX&client_secret=AARRX54N1DZKWZ5SPOJ3QPCDUJD2XN4TT0BJAIRUVI51DUSS&ll=40.7,-74&categoryId=4bf58dd8d48988d1cb941735"

json = HTTParty.get(url)
hash = json.parsed_response	
response = hash['response']['groups'][0]['items']


require 'open-uri'

response.each do |truck|
	name = truck['name']
	lat = truck['location']['lat']
	lng = truck['location']['lng']
	photo_url = truck['categories'][0]['icon']

	Truck.create(name: name, latitude: lat, longitude: lng, photo_url: photo_url)
end


