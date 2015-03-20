Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :doctors do
        collection do
          get :org
        end
      end
      resources :organizations
      resources :trials do
        collection do
          get :doctor
        end
      end
      resources :archives
      resources :sessions, only: [:create]
      resource :search, only: [:show]
    end
  end
  resources :pages
  root 'pages#index'
end
