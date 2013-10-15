class Food < ActiveRecord::Base
  attr_accessible :type_food

  validates :type_food, presence: true
  has_and_belongs_to_many :trucks
end
 