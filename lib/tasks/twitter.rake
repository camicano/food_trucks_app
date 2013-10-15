namespace :twitter do 
	desc "Retrieves last tweet"
	task :last_tweet => :environment do
		puts "tweet!"
	end

	desc "Retrieves 3 most recent tweets"
	task :last_tweets => :environment do
		puts "tweet, tweet and tweet!"
	end

	desc "Search Twitter for a query and number of results"
	task :search, [:query, :limit] => :environment do |t, args|
		limit = args[:limit].to_i
		t = Twitter.search(args[:query], :count => limit, :result_type => "recent")
		puts "#{t.statuses.count} results"
		if t.statuses.count > 0
			t.statuses.each do |tweet|
				puts "#{tweet.created_at} #{tweet.text}"
				Tweet.create(:post => tweet.text)
			end
		else
			puts "No search results for #{args[:query]}"
		end
	end
end
