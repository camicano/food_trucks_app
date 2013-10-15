FoodTruckApp::Application.routes.draw do
	devise_for :users

	get '/trucks/finder', :to => 'trucks#finder'

	get '/trucks', :to => 'trucks#index'
	root :to => 'trucks#index'
end
