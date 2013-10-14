class Food < ActiveRecord::Base
  attr_accessible :type

  validates :type, presence: true
  has_and_belongs_to_many :trucks
end
 