class Truck < ActiveRecord::Base
  attr_accessible :name, :photo_url, :tweet1, :tweet2, :tweet3, :user_id, :latitude, :longitude, :foursq_id

  validates :name, :latitude, :longitude, presence: true
  belongs_to :user
  has_and_belongs_to_many :foods
end
