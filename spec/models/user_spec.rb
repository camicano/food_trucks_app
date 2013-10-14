require 'spec_helper'

describe User do
	before do
		@user = User.new
		@user.email = Faker::Internet.email
		@user.password = Faker::Internet.password
	end

  it { expect(@user.email).to be_true }
  it { should have_many(:trucks) }
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:password) }
end
  