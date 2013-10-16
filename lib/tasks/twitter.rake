namespace :twitter do 
	
	desc "Search Twitter for a query and number of results"
  task :search => :environment do
  	trucks = Truck.all
  	
    trucks.each do |truck|
 			truck.twitter
  		truck.name
  		arg = truck.twitter || truck.name

      t_array = []
      t = Twitter.search(arg, :count => 3, :result_type => "recent")

      if t.statuses.count > 0
          t.statuses.each do |tweet|
            tweet = "#{tweet.created_at},  #{tweet.text}"
            t_array << tweet
        end
      end
      Truck.update(truck.id, tweet_1: t_array[0], tweet_2: t_array[1], tweet_3: t_array[2])
    end
  end
end



