Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :doctors
      resources :organizations
      resources :trials
      resources :archives
      resource :search, only: [:show]
    end
  end
  resources :pages
  root 'pages#index'
end
