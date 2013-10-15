namespace :twitter do 
	
	desc "Search Twitter for a query and number of results"
  task :search => :environment do
  	Tweet.delete_all
  	trucks = Truck.all
  	trucks.each do |truck|
 			truck.twitter
  		truck.name
  		arg = truck.twitter || truck.name

    t = Twitter.search(arg, :count => 3, :result_type => "recent")
    puts "#{t.statuses.count} results"
    if t.statuses.count > 0
      t.statuses.each do |tweet|
        # Print each post and date to console
        puts "#{tweet.text}"
        # Save the twitter post to the database
        tx = Tweet.create(:post => tweet.text)
        truck.tweets << tx
      end
    end
  end
end
end



