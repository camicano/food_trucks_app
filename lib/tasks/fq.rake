namespace :fq do 
	desc "Retrieves last check-in"
	task :last => :environment do
		puts "checked in at ... !"
	end

	desc "Retrieves food-truck-venues and creates Truck instances"
	task :trucks => :environment do
		Truck.delete_all
		require 'open-uri'
		json = HTTParty.get("https://api.foursquare.com/v2/venues/search?client_id=RJSWD24SW0YBT3ARBT3UES4HFRZCE5XZR5HPN0MIC11KJXDX&client_secret=AARRX54N1DZKWZ5SPOJ3QPCDUJD2XN4TT0BJAIRUVI51DUSS&ll=40.7,-74&categoryId=4bf58dd8d48988d1cb941735")
		hash = json.parsed_response	
		response = hash['response']['groups'][0]['items']

		response.each do |truck|
			twitter = truck['contact']['twitter']
			name = truck['name']
			lat = truck['location']['lat']
			lng = truck['location']['lng']
			Truck.create(name: name, latitude: lat, longitude: lng, twitter: twitter)
		end
	end
	desc "test"
	task :twitter => :environment do
		trucks = [Truck.first, Truck.last]
  	
 		trucks.each do |truck|
            arg = truck.twitter || truck.name

	      	t = Twitter.search("from: #{truck.twitter}", :count => 3, :result_type => "recent")

      	if t.statuses.count > 0
        	t.statuses.each do |tweet|
        	  tweet = "#{tweet.created_at}, #{tweet.text}"
        	  t_array << tweet
        	end
      	end
	    t_array.sort!
      	Truck.update(truck.id, tweet_1: t_array[0], tweet_2: t_array[1], tweet_3: t_array[2])
		end
	end
end

