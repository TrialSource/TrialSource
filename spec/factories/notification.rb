FactoryGirl.define do
  factory :notification do
    email "user@email.com"
    condition "asthma"
    exclusion_ids "2"
  end
end
