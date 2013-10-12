class TrucksController < ApplicationController
	require 'open-uri'

	def index
		@trucks = Truck.all
	end
end
