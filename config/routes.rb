Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :doctors
      resources :admins
    end
  end
end
