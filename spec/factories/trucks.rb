require 'faker' 
FactoryGirl.define do 
	factory :truck do |f| 
		f.name { Faker::Name.first_name } 
		f.latitude { Faker::Address.latitude } 
		f.longitude { Faker::Address.longitude } 
	end 
end