class FoodsController < ApplicationController
	def index
		@response = Food.all 

		respond_to do |format|
			format.html
			format.json {render :json => @response.to_json}
		end	
	end
end
