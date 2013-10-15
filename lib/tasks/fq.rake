namespace :fq do 
	desc "Retrieves last check-in"
	task :last => :environment do
		puts "checked in at ... !"
	end
end
