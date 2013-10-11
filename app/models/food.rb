class Food < ActiveRecord::Base
  attr_accessible :type

  has_and_belongs_to_many :trucks
end
