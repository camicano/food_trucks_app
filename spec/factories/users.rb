require 'faker'


describe User do
	before do 
		@user = User.new
		@user.email = Faker::Internet.email
	end
	end

