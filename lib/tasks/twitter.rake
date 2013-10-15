namespace :twitter do 
	desc "Retrieves last tweet"
	task :last_tweet => :environment do
		puts "tweet!"
	end

	desc "Retrieves 3 most recent tweets"
	task :last_tweets => :environment do
		puts "tweet, tweet and tweet!"
	end
end
