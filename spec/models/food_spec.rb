require 'spec_helper'

describe Food do
  before do
  	@food = Food.new
  	@food.type = Faker::Name.first_name
  end 
  it { should validate_presence_of(:type) }
  it { should have_and_belong_to_many(:trucks) }
end
