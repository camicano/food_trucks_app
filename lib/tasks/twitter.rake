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
      
      if t.statuses.count > 0
          t.statuses.each do |tweet|
            tx = Tweet.create(:post => tweet.text)
            truck.tweets << tx
        end
      end
    end
  end
end



