class Truck < ActiveRecord::Base
  attr_accessible :name, :twitter, :user_id, 
  :latitude, :longitude, :tweet_1, :tweet_2, 
  :tweet_3, :location

  geocoded_by :location
  before_validation :geocode

  validates :name, :latitude, :longitude, presence: true
  belongs_to :user
  has_and_belongs_to_many :foods
end
