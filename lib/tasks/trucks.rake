namespace :trucks do 

	desc "List all trucks"
		task :all => :environment do
			trucks = Truck.all
			trucks.each do |truck|
				truck.name
				truck.latitude
				truck.longitude
				truck.photo_url
			puts "#{truck.name}"
		end
	end

	desc "List all trucks and coords"
		task :locations => :environment do
			trucks = Truck.all
			trucks.each do |truck|
				truck.name
				truck.latitude
				truck.longitude
			puts "#{truck.name}, located at: (#{truck.latitude}, #{truck.longitude})"
			end
		end
end
