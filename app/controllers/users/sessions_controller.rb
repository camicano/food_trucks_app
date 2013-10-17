class Users::SessionsController < Devise::SessionsController
	def after_sign_in_path_for(resource)
		stored_location_for(resource) || truck_path
	end
end 