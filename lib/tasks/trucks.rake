namespace :trucks do 

	desc "List all trucks"
	task :all => :environment do
		trucks = Truck.all
		puts "#{trucks}"
	end

end
