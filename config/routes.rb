Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :doctors
      resources :admins
      resources :trials
    end
  end
  resources :pages
  root 'pages#index'
end
