class Truck < ActiveRecord::Base
  attr_accessible :name, :photo_url, :twitter, :user_id, :latitude, :longitude, :tweet_1, :tweet_2, :tweet_3

  validates :name, :latitude, :longitude, presence: true
  belongs_to :user
  has_and_belongs_to_many :foods
  has_many :tweets 
end
