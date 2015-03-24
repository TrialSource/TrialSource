class CreateExclusions < ActiveRecord::Migration
  def change
    create_table :exclusions do |t|
      t.string :name
      t.integer :trial_id

      t.timestamps null: false
    end
  end
end
