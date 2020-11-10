package com.ouri.tree.dao;

import java.sql.Array;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel="couples",path="couples")
public interface CoupleRepo extends JpaRepository<Couple, Integer>{

	/*
	 * List<Person> findByFamilyName(String familyName);
	 * 
	 * List<Person> findByFamilyNameGreaterThan(String familyName);
	 * 
	 * @Query("from Couple where partner1=?1 or partner2=?1")
	 *  List<Person> findByFirstNameSorted(String firstName);
	 */
	Optional<Couple> findById(Integer id);
	
	@Query("from Couple where parent1=?1 or parent2=?1")
	List<Couple> findByParent(Integer parent);
	
	@Query("from Couple where id in ?1")
	List<Couple> findById(Array ids);
	
}
