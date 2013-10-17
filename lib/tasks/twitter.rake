namespace :twitter do 
	
  desc "Search Twitter for a query and number of results"
  task :search => :environment do
    require 'open-uri'

    json = HTTParty.get("https://api.foursquare.com/v2/venues/search?client_id=RJSWD24SW0YBT3ARBT3UES4HFRZCE5XZR5HPN0MIC11KJXDX&client_secret=AARRX54N1DZKWZ5SPOJ3QPCDUJD2XN4TT0BJAIRUVI51DUSS&near=New%20York%20City&query=Food%20Truck&intent=browse")
    hash = json.parsed_response 
    response = hash['response']['groups'][0]['items']

    response.each do |truck|
      t = Truck.find_by_name(truck['name'])
      if t
        lat = truck['location']['lat']
        lng = truck['location']['lng']
        Truck.update(t.id, :latitude => lat, :longitude => lng)
      else
        twitter = truck['contact']['twitter']
        name = truck['name']
        lat = truck['location']['lat']
        lng = truck['location']['lng']
        Truck.create(name: name, latitude: lat, longitude: lng, twitter: twitter)
      end
    end

    json = HTTParty.get("https://api.foursquare.com/v2/venues/search?client_id=RJSWD24SW0YBT3ARBT3UES4HFRZCE5XZR5HPN0MIC11KJXDX&client_secret=AARRX54N1DZKWZ5SPOJ3QPCDUJD2XN4TT0BJAIRUVI51DUSS&near=New%20York%20City&categoryId=4bf58dd8d48988d1cb941735&intent=browse")
    hash = json.parsed_response 
    response = hash['response']['groups'][0]['items']

    response.each do |truck|
      t = Truck.find_by_name(truck['name'])
      if t
        lat = truck['location']['lat']
        lng = truck['location']['lng']
        Truck.update(t.id, :latitude => lat, :longitude => lng)
      else
        twitter = truck['contact']['twitter']
        name = truck['name']
        lat = truck['location']['lat']
        lng = truck['location']['lng']
        Truck.create(name: name, latitude: lat, longitude: lng, twitter: twitter)
      end
    end

    trucks = Truck.all
    trucks.each do |truck|
        t = Twitter.search("from: #{truck.twitter}", :count => 3, :result_type => "recent")
        t_array = []
        if t.statuses.count > 0
          t.statuses.each do |tweet|
            tweet = "#{tweet.text}"
            t_array << tweet
          end
        end
        Truck.update(truck.id, tweet_1: t_array[0], tweet_2: t_array[1], tweet_3: t_array[2])
    end
  end
end
