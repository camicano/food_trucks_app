class TrucksController < ApplicationController
	require 'open-uri'

	def index
		@response = Truck.all
	end
end
