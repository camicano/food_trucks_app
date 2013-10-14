require 'faker'


describe User do
	before do 
		@user = User.new(:email => true)
	end


# FactoryGirl.define do 
# 	factory :user do |f|
# 		f.email { Faker::Internet.email }
# 		f.password "password"
# 	end
end
