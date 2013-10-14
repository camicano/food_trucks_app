require 'spec_helper'

describe Truck do
  it "is invalid without a name" do
  	Factory.build(:contact, firstname: nil).should_not be_valid 
  end
  # it "belongs to many foods"
  # it "belongs to one user"
  it "it is invalid without a latitude"
  it "it is invalid without a longitude"
end
