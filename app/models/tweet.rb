class Tweet < ActiveRecord::Base
	attr_accessible :post
	belongs_to :truck
end