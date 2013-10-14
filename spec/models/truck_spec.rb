require 'spec_helper'

describe Truck do
  before do
  	@truck = Truck.new
  	@truck.name = Faker::Name.first_name
  	@truck.latitude = Faker::Address.latitude 
	@truck.longitude = Faker::Address.longitude
  end 

  it { should have_and_belong_to_many(:foods) }
  it { should belong_to(:user) }
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:latitude) }
  it { should validate_presence_of(:longitude) }
    
end
