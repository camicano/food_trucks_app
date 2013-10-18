require 'spec_helper'

describe Food do
  before do
  	@food = Food.new
  	@food.type = Faker::Name.first_name
  end 
  
  it "should have a valid type" do
   should validate_presence_of(:type)
  end

  it { should have_and_belong_to_many(:trucks) }
end
