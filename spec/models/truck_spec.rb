require 'spec_helper'

describe Truck do
  before do
  	@truck = Truck.new
  	@truck.name = Faker::Name.first_name
  	@truck.latitude = Faker::Address.latitude 
	@truck.longitude = Faker::Address.longitude
  end 

  it "is invalid without a name" do
  	expect(@truck.name).to be_true
  end
  it { should belong_to(:foods) }
  it { should belong_to(:user) }
  it { should validate_presence_of(:latitude) }
  it { should validate_presence_of(:longitude) }
    
end
